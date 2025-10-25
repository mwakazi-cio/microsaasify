"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function NewAppPage() {
  const [step, setStep] = useState(1);
  const [googleConnected, setGoogleConnected] = useState(false);

  return (
    <div className="container mx-auto py-8 px-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New App</h1>
        <p className="text-gray-600">
          Turn your Google Sheet into a SaaS application
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            3
          </div>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Connect Google Sheets</CardTitle>
            <p className="text-gray-600">
              First, connect your Google account to access your spreadsheets
            </p>
          </CardHeader>
          <CardContent>
            {googleConnected ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Google account connected successfully! You can now select a
                  spreadsheet.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Connect Google Account
                </h3>
                <p className="text-gray-600 mb-6">
                  We'll need access to your Google Sheets to create your SaaS
                  app
                </p>
                <Link href="/api/google/oauth">
                  <Button size="lg" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Connect Google Account
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Spreadsheet</CardTitle>
            <p className="text-gray-600">
              Choose which Google Sheet you want to turn into a SaaS app
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Loading spreadsheets...
              </h3>
              <p className="text-gray-600">
                This feature will be implemented in the next milestone
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>App Configuration</CardTitle>
            <p className="text-gray-600">
              Configure your app settings and branding
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="app-name">App Name</Label>
                <Input id="app-name" placeholder="My SaaS App" />
              </div>
              <div>
                <Label htmlFor="app-description">Description</Label>
                <Textarea
                  id="app-description"
                  placeholder="Describe what your app does..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="template">Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="directory">Directory</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="catalog">Catalog</SelectItem>
                    <SelectItem value="portal">Portal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setStep(Math.min(3, step + 1))}
          disabled={step === 3}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
