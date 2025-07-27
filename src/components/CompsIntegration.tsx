import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, MapPin, Calendar, TrendingUp, AlertTriangle, Pin, X, Filter } from 'lucide-react';

interface CompProperty {
  id: string;
  name: string;
  address: string;
  price: number;
  pricePerSqft: number;
  capRate: number;
  sqft: number;
  yearBuilt: number;
  saleDate: string;
  distance: number;
  isSubject?: boolean;
  isPinned?: boolean;
  isOutlier?: boolean;
}

export const CompsIntegration: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [filters, setFilters] = useState({
    assetType: 'all',
    dateRange: '12months',
    distance: '5miles'
  });
  const [pinnedComps, setPinnedComps] = useState<Set<string>>(new Set());
  const [excludedComps, setExcludedComps] = useState<Set<string>>(new Set());

  const subjectProperty: CompProperty = {
    id: 'subject',
    name: 'Metro Tower Office Building',
    address: '123 Financial District, Downtown',
    price: 24500000,
    pricePerSqft: 196,
    capRate: 6.8,
    sqft: 125000,
    yearBuilt: 1998,
    saleDate: 'Under Contract',
    distance: 0,
    isSubject: true
  };

  const [comps, setComps] = useState<CompProperty[]>([
    {
      id: '1',
      name: 'Gateway Plaza',
      address: '456 Business Center Dr',
      price: 22000000,
      pricePerSqft: 210,
      capRate: 6.5,
      sqft: 105000,
      yearBuilt: 2001,
      saleDate: '2024-01-15',
      distance: 0.8,
      isOutlier: true
    },
    {
      id: '2',
      name: 'Commerce Tower',
      address: '789 Corporate Blvd',
      price: 18500000,
      pricePerSqft: 185,
      capRate: 7.2,
      sqft: 100000,
      yearBuilt: 1995,
      saleDate: '2023-11-20',
      distance: 1.2
    },
    {
      id: '3',
      name: 'Executive Center',
      address: '321 Downtown Ave',
      price: 26800000,
      pricePerSqft: 201,
      capRate: 6.9,
      sqft: 133500,
      yearBuilt: 2003,
      saleDate: '2024-02-08',
      distance: 0.5
    },
    {
      id: '4',
      name: 'Metropolitan Office',
      address: '654 Financial St',
      price: 21200000,
      pricePerSqft: 188,
      capRate: 7.0,
      sqft: 112800,
      yearBuilt: 1999,
      saleDate: '2023-12-03',
      distance: 1.8
    },
    {
      id: '5',
      name: 'Corporate Plaza',
      address: '987 Business Park Way',
      price: 19800000,
      pricePerSqft: 192,
      capRate: 6.7,
      sqft: 103200,
      yearBuilt: 2000,
      saleDate: '2024-01-28',
      distance: 2.1
    }
  ]);

  const togglePin = (compId: string) => {
    const newPinned = new Set(pinnedComps);
    if (newPinned.has(compId)) {
      newPinned.delete(compId);
    } else {
      newPinned.add(compId);
    }
    setPinnedComps(newPinned);
  };

  const excludeComp = (compId: string) => {
    const newExcluded = new Set(excludedComps);
    newExcluded.add(compId);
    setExcludedComps(newExcluded);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'Under Contract') return dateString;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRowClassName = (comp: CompProperty) => {
    if (comp.isSubject) return "bg-blue-50 border-blue-200";
    if (excludedComps.has(comp.id)) return "opacity-50 bg-gray-50";
    if (comp.isOutlier) return "bg-red-50 border-red-200";
    if (pinnedComps.has(comp.id)) return "bg-green-50 border-green-200";
    return "";
  };

  const filteredComps = comps.filter(comp => !excludedComps.has(comp.id));
  const allProperties = [subjectProperty, ...filteredComps];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Comparable Sales Analysis
          </CardTitle>
          <div className="flex items-center gap-2">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'table' | 'cards')}>
              <TabsList>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="cards">Cards</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={filters.assetType} onValueChange={(value) => setFilters({...filters, assetType: value})}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Select value={filters.dateRange} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="12months">12 Months</SelectItem>
              <SelectItem value="24months">24 Months</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.distance} onValueChange={(value) => setFilters({...filters, distance: value})}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1mile">1 Mile</SelectItem>
              <SelectItem value="5miles">5 Miles</SelectItem>
              <SelectItem value="10miles">10 Miles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {viewMode === 'table' ? (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Sale Price</TableHead>
                  <TableHead>$/SqFt</TableHead>
                  <TableHead>Cap Rate</TableHead>
                  <TableHead>SqFt</TableHead>
                  <TableHead>Year Built</TableHead>
                  <TableHead>Sale Date</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allProperties.map((property) => (
                  <TableRow 
                    key={property.id} 
                    className={getRowClassName(property)}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2">
                          {property.name}
                          {property.isSubject && <Badge variant="outline">Subject</Badge>}
                          {property.isOutlier && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Outlier
                            </Badge>
                          )}
                          {pinnedComps.has(property.id) && (
                            <Badge variant="secondary" className="text-xs">
                              <Pin className="h-3 w-3 mr-1" />
                              Pinned
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {property.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(property.price)}
                    </TableCell>
                    <TableCell>
                      <span className={property.isOutlier ? "text-red-600 font-medium" : ""}>
                        ${property.pricePerSqft}
                      </span>
                    </TableCell>
                    <TableCell>{property.capRate}%</TableCell>
                    <TableCell>{property.sqft.toLocaleString()}</TableCell>
                    <TableCell>{property.yearBuilt}</TableCell>
                    <TableCell>{formatDate(property.saleDate)}</TableCell>
                    <TableCell>
                      {property.distance === 0 ? '-' : `${property.distance} mi`}
                    </TableCell>
                    <TableCell>
                      {!property.isSubject && (
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePin(property.id)}
                            className={pinnedComps.has(property.id) ? "text-green-600" : ""}
                          >
                            <Pin className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => excludeComp(property.id)}
                            className="text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProperties.map((property) => (
              <Card 
                key={property.id} 
                className={`relative ${property.isSubject ? 'border-blue-500' : ''} ${property.isOutlier ? 'border-red-500' : ''}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{property.name}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.address}
                      </p>
                    </div>
                    {!property.isSubject && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePin(property.id)}
                          className={pinnedComps.has(property.id) ? "text-green-600" : ""}
                        >
                          <Pin className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => excludeComp(property.id)}
                          className="text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {property.isSubject && <Badge variant="outline" className="text-xs">Subject</Badge>}
                    {property.isOutlier && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Outlier
                      </Badge>
                    )}
                    {pinnedComps.has(property.id) && (
                      <Badge variant="secondary" className="text-xs">
                        <Pin className="h-3 w-3 mr-1" />
                        Pinned
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Sale Price</div>
                      <div className="font-medium">{formatCurrency(property.price)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">$/SqFt</div>
                      <div className={`font-medium ${property.isOutlier ? "text-red-600" : ""}`}>
                        ${property.pricePerSqft}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Cap Rate</div>
                      <div className="font-medium">{property.capRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Distance</div>
                      <div className="font-medium">
                        {property.distance === 0 ? '-' : `${property.distance} mi`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span>{property.sqft.toLocaleString()} sqft • {property.yearBuilt}</span>
                      <span>{formatDate(property.saleDate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">${Math.round(filteredComps.reduce((sum, comp) => sum + comp.pricePerSqft, 0) / filteredComps.length)}</div>
              <div className="text-sm text-muted-foreground">Avg $/SqFt</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {(filteredComps.reduce((sum, comp) => sum + comp.capRate, 0) / filteredComps.length).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Cap Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{filteredComps.length}</div>
              <div className="text-sm text-muted-foreground">Active Comps</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{pinnedComps.size}</div>
              <div className="text-sm text-muted-foreground">Pinned Comps</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};