"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { RiskAssessment, PatientData } from "@/app/page"
import { AlertTriangle, Heart, Droplets, RotateCcw, TrendingUp } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface RiskAssessmentDashboardProps {
  assessment: RiskAssessment
  patientData: PatientData
}

export function RiskAssessmentDashboard({ assessment, patientData }: RiskAssessmentDashboardProps) {
  const riskData = [
    { name: "Mortality", value: assessment.mortalityRisk, color: "#ef4444" },
    { name: "Infection", value: assessment.infectionRisk, color: "#f97316" },
    { name: "Bleeding", value: assessment.bleedingRisk, color: "#eab308" },
    { name: "Readmission", value: assessment.readmissionRisk, color: "#3b82f6" },
  ]

  const chartData = [
    { risk: "Mortality", value: assessment.mortalityRisk },
    { risk: "Infection", value: assessment.infectionRisk },
    { risk: "Bleeding", value: assessment.bleedingRisk },
    { risk: "Readmission", value: assessment.readmissionRisk },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-500"
      case "Moderate":
        return "bg-yellow-500"
      case "High":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Low":
        return "default"
      case "Moderate":
        return "secondary"
      case "High":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Risk Summary */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-gray-800 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-6 w-6" />
            LuminaX-alt Risk Assessment
          </CardTitle>
          <CardDescription className="text-gray-200">
            Patient: {patientData.demographics.age}y {patientData.demographics.gender}, BMI:{" "}
            {patientData.demographics.bmi}, Surgery: {patientData.surgeryType}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">Risk Level</p>
              <Badge variant={getRiskBadgeVariant(assessment.overallRisk)} className="mt-2">
                {assessment.overallRisk} Risk
              </Badge>
            </div>
            <div
              className={`w-16 h-16 rounded-full ${getRiskColor(assessment.overallRisk)} flex items-center justify-center`}
            >
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Risk Scores */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-md border-0 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3 bg-gradient-to-r from-red-50 to-red-100 rounded-t-lg">
            <CardTitle className="text-sm flex items-center gap-2 text-red-800">
              <Heart className="h-4 w-4 text-red-600" />
              Mortality Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{assessment.mortalityRisk.toFixed(1)}%</span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <Progress value={assessment.mortalityRisk} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3 bg-gradient-to-r from-red-50 to-red-100 rounded-t-lg">
            <CardTitle className="text-sm flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Infection Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{assessment.infectionRisk.toFixed(1)}%</span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <Progress value={assessment.infectionRisk} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3 bg-gradient-to-r from-red-50 to-red-100 rounded-t-lg">
            <CardTitle className="text-sm flex items-center gap-2 text-red-800">
              <Droplets className="h-4 w-4 text-red-600" />
              Bleeding Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{assessment.bleedingRisk.toFixed(1)}%</span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <Progress value={assessment.bleedingRisk} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3 bg-gradient-to-r from-red-50 to-red-100 rounded-t-lg">
            <CardTitle className="text-sm flex items-center gap-2 text-red-800">
              <RotateCcw className="h-4 w-4 text-red-600" />
              Readmission Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{assessment.readmissionRisk.toFixed(1)}%</span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <Progress value={assessment.readmissionRisk} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Visualization Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-gray-800">Risk Distribution</CardTitle>
            <CardDescription className="text-gray-600">
              AI-powered comparative analysis of all risk categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Risk %",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-gray-800">Risk Comparison</CardTitle>
            <CardDescription className="text-gray-600">
              AI-powered comparative analysis of all risk categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Risk %",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="risk" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
