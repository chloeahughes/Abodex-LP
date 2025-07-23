import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function AuthCallback() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function handleAuth() {
      setLoading(true);
      setError("");
      // Get session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        setError("Authentication failed. Please try again.");
        setLoading(false);
        return;
      }
      const user = session.user;
      // Check for existing deals for this user
      const { data: deals, error: dealsError } = await supabase
        .from("deals")
        .select("id")
        .eq("user_id", user.id)
        .limit(1);
      if (dealsError) {
        setError("Failed to fetch deals: " + dealsError.message);
        setLoading(false);
        return;
      }
      let dealId;
      if (deals && deals.length > 0) {
        dealId = deals[0].id;
      } else {
        // Create a unique deal room for this user
        const { data: newDeal, error: createError } = await supabase
          .from("deals")
          .insert({
            user_id: user.id,
            property_name: "My First Deal Room",
            status: "Active",
            value: "$0",
            stage: "Initial Review",
            days: 0,
            people: 1,
            last_updated: new Date().toISOString(),
            unread_messages: 0,
          })
          .select()
          .single();
        if (createError) {
          setError("Failed to create deal: " + createError.message);
          setLoading(false);
          return;
        }
        dealId = newDeal.id;
      }
      // Redirect to the user's deal dashboard or deal room
      navigate(`/deals/${dealId}`);
    }
    handleAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-8">
        <CardTitle>Authenticating...</CardTitle>
        <CardContent>
          {loading && <div>Checking your session and deals...</div>}
          {error && <div className="text-red-600 mt-4">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
} 