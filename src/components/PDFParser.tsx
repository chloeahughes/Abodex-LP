import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, Eye, Edit3, User, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ParsedSection {
  title: string;
  content: string;
  confidence: number;
  page: number;
}

interface ParsedData {
  fileName: string;
  sections: ParsedSection[];
  summary: {
    propertyName: string;
    price: string;
    capRate: string;
    sqft: string;
    yearBuilt: string;
  };
}

export const PDFParser: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [reviewedSections, setReviewedSections] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<string>('');
  const { toast } = useToast();

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate parsing progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Mock parsed data
          setParsedData({
            fileName: file.name,
            sections: [
              {
                title: "Property Overview",
                content: "Prime office building located in downtown financial district. Class A construction with modern amenities and excellent transportation access.",
                confidence: 0.95,
                page: 1
              },
              {
                title: "Rent Roll",
                content: "Current occupancy: 92%. Average rent: $45/sqft. Major tenants include financial services and tech companies.",
                confidence: 0.88,
                page: 3
              },
              {
                title: "Financial Summary",
                content: "NOI: $2.4M annually. Operating expenses: $850K. Capital improvements planned: $200K.",
                confidence: 0.92,
                page: 5
              },
              {
                title: "Market Analysis",
                content: "Submarket vacancy: 8%. Rental growth: 3.2% annually. Comparable sales range: $350-425/sqft.",
                confidence: 0.87,
                page: 7
              }
            ],
            summary: {
              propertyName: "Metro Tower Office Building",
              price: "$24,500,000",
              capRate: "6.8%",
              sqft: "125,000",
              yearBuilt: "1998"
            }
          });

          toast({
            title: "PDF parsed successfully",
            description: "Document analysis complete. Review extracted data.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleSectionReview = (sectionTitle: string, checked: boolean) => {
    const newReviewed = new Set(reviewedSections);
    if (checked) {
      newReviewed.add(sectionTitle);
    } else {
      newReviewed.delete(sectionTitle);
    }
    setReviewedSections(newReviewed);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-100 text-green-800";
    if (confidence >= 0.8) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  if (!parsedData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            PDF Document Parser
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-muted-foreground/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Upload Offering Memorandum</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your PDF or click to select
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Select PDF File
              </label>
            </Button>
          </div>
          
          {isUploading && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Parsing document...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Pane - PDF Preview */}
      <Card className="h-[800px]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Eye className="h-4 w-4" />
            {parsedData.fileName}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-full bg-gray-100 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <FileText className="h-16 w-16 mx-auto mb-4" />
              <p>PDF Preview</p>
              <p className="text-sm">Interactive highlighting on hover</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Pane - Parsed Data */}
      <Card className="h-[800px]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Edit3 className="h-4 w-4" />
            Extracted Data
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 overflow-auto">
          <Tabs value={activeSection || parsedData.sections[0]?.title} onValueChange={setActiveSection}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(parsedData.summary).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    <div className="p-2 border rounded text-sm bg-background">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sections" className="space-y-4">
              {parsedData.sections.map((section, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      {section.title}
                      <Badge className={getConfidenceColor(section.confidence)}>
                        {Math.round(section.confidence * 100)}%
                      </Badge>
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`review-${index}`}
                        checked={reviewedSections.has(section.title)}
                        onCheckedChange={(checked) => 
                          handleSectionReview(section.title, checked as boolean)
                        }
                      />
                      <label htmlFor={`review-${index}`} className="text-sm">
                        Reviewed
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {section.content}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Page {section.page}</span>
                    <Button variant="ghost" size="sm">
                      <User className="h-3 w-3 mr-1" />
                      Assign Reviewer
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
                {reviewedSections.size} of {parsedData.sections.length} sections reviewed
              </div>
              <Button>Send to Underwriting</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};