import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, DollarSign, Calendar, MapPin, TrendingUp, FileText, Send, Edit3, CheckCircle2 } from 'lucide-react';

interface DealData {
  propertyName: string;
  address: string;
  price: string;
  capRate: string;
  gla: string;
  yearBuilt: string;
  propertyType: string;
  stage: string;
  confidence: {
    propertyName: number;
    price: number;
    capRate: number;
    gla: number;
    yearBuilt: number;
  };
}

interface DealSummaryCardProps {
  dealData?: DealData;
  isVisible: boolean;
  onClose: () => void;
  onSendToUnderwriting: (data: DealData) => void;
}

export const DealSummaryCard: React.FC<DealSummaryCardProps> = ({
  dealData,
  isVisible,
  onClose,
  onSendToUnderwriting
}) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<DealData>(
    dealData || {
      propertyName: "Metro Tower Office Building",
      address: "123 Financial District, Downtown",
      price: "$24,500,000",
      capRate: "6.8%",
      gla: "125,000",
      yearBuilt: "1998",
      propertyType: "Office",
      stage: "Initial Review",
      confidence: {
        propertyName: 0.95,
        price: 0.88,
        capRate: 0.92,
        gla: 0.85,
        yearBuilt: 0.78
      }
    }
  );

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500";
    if (confidence >= 0.8) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.9) return <CheckCircle2 className="h-3 w-3" />;
    if (confidence >= 0.8) return <Edit3 className="h-3 w-3" />;
    return <Edit3 className="h-3 w-3" />;
  };

  const handleInputChange = (field: keyof DealData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendToUnderwriting = () => {
    onSendToUnderwriting(formData);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Deal Summary - Auto-Generated
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(!editMode)}
              >
                <Edit3 className="h-4 w-4 mr-1" />
                {editMode ? "View" : "Edit"}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ×
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Property Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Property Name
                <div className="flex items-center gap-1">
                  <div 
                    className={`h-2 w-2 rounded-full ${getConfidenceColor(formData.confidence.propertyName)}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {Math.round(formData.confidence.propertyName * 100)}%
                  </span>
                </div>
              </Label>
              {editMode ? (
                <Input
                  value={formData.propertyName}
                  onChange={(e) => handleInputChange('propertyName', e.target.value)}
                />
              ) : (
                <div className="p-2 border rounded text-sm bg-background">
                  {formData.propertyName}
                </div>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              {editMode ? (
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              ) : (
                <div className="p-2 border rounded text-sm bg-background">
                  {formData.address}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Purchase Price
                <div className="flex items-center gap-1">
                  <div 
                    className={`h-2 w-2 rounded-full ${getConfidenceColor(formData.confidence.price)}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {Math.round(formData.confidence.price * 100)}%
                  </span>
                </div>
              </Label>
              {editMode ? (
                <Input
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              ) : (
                <div className="p-2 border rounded text-sm bg-background font-medium">
                  {formData.price}
                </div>
              )}
            </div>

            {/* Cap Rate */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Cap Rate
                <div className="flex items-center gap-1">
                  <div 
                    className={`h-2 w-2 rounded-full ${getConfidenceColor(formData.confidence.capRate)}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {Math.round(formData.confidence.capRate * 100)}%
                  </span>
                </div>
              </Label>
              {editMode ? (
                <Input
                  value={formData.capRate}
                  onChange={(e) => handleInputChange('capRate', e.target.value)}
                />
              ) : (
                <div className="p-2 border rounded text-sm bg-background font-medium">
                  {formData.capRate}
                </div>
              )}
            </div>

            {/* GLA */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                GLA (sqft)
                <div className="flex items-center gap-1">
                  <div 
                    className={`h-2 w-2 rounded-full ${getConfidenceColor(formData.confidence.gla)}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {Math.round(formData.confidence.gla * 100)}%
                  </span>
                </div>
              </Label>
              {editMode ? (
                <Input
                  value={formData.gla}
                  onChange={(e) => handleInputChange('gla', e.target.value)}
                />
              ) : (
                <div className="p-2 border rounded text-sm bg-background">
                  {formData.gla}
                </div>
              )}
            </div>

            {/* Year Built */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Year Built
                <div className="flex items-center gap-1">
                  <div 
                    className={`h-2 w-2 rounded-full ${getConfidenceColor(formData.confidence.yearBuilt)}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {Math.round(formData.confidence.yearBuilt * 100)}%
                  </span>
                </div>
              </Label>
              {editMode ? (
                <Input
                  value={formData.yearBuilt}
                  onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                />
              ) : (
                <div className="p-2 border rounded text-sm bg-background">
                  {formData.yearBuilt}
                </div>
              )}
            </div>
          </div>

          {/* Property Type & Stage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Property Type</Label>
              {editMode ? (
                <Select 
                  value={formData.propertyType} 
                  onValueChange={(value) => handleInputChange('propertyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                    <SelectItem value="Multifamily">Multifamily</SelectItem>
                    <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="outline" className="w-fit">
                  {formData.propertyType}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label>Current Stage</Label>
              {editMode ? (
                <Select 
                  value={formData.stage} 
                  onValueChange={(value) => handleInputChange('stage', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Initial Review">Initial Review</SelectItem>
                    <SelectItem value="Underwriting">Underwriting</SelectItem>
                    <SelectItem value="Due Diligence">Due Diligence</SelectItem>
                    <SelectItem value="IC Review">IC Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="secondary" className="w-fit">
                  {formData.stage}
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold">$196</div>
              <div className="text-sm text-muted-foreground">Price per sqft</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">92%</div>
              <div className="text-sm text-muted-foreground">Current occupancy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">$2.4M</div>
              <div className="text-sm text-muted-foreground">Annual NOI</div>
            </div>
          </div>

          {/* Document Links */}
          <div className="space-y-2">
            <Label>Related Documents</Label>
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Offering_Memorandum_Metro_Tower.pdf</span>
              <Button variant="ghost" size="sm" className="ml-auto">
                Preview
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Auto-generated from uploaded OM • Ready for review
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onClose}>
                Save as Draft
              </Button>
              <Button onClick={handleSendToUnderwriting}>
                <Send className="h-4 w-4 mr-2" />
                Send to Underwriting
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};