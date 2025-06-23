"use client"

import { useState } from "react"
import { PatientDataForm } from "@/components/patient-data-form"
import { RiskAssessmentDashboard } from "@/components/risk-assessment-dashboard"
import { RecommendationsPanel } from "@/components/recommendations-panel"
import { SchedulingIntegration } from "@/components/scheduling-integration"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Brain, Calendar, FileText } from "lucide-react"
import { ProfessionalHeader } from "@/components/professional-header"

export interface PatientData {
  demographics: {
    age: number
    gender: string
    bmi: number
  }
  vitals: {
    systolicBP: number
    diastolicBP: number
    heartRate: number
    temperature: number
    oxygenSaturation: number
  }
  labs: {
    hemoglobin: number
    whiteBloodCells: number
    platelets: number
    creatinine: number
    glucose: number
  }
  comorbidities: string[]
  surgeryType: string
  surgeryComplexity: string
}

export interface RiskAssessment {
  mortalityRisk: number
  infectionRisk: number
  bleedingRisk: number
  readmissionRisk: number
  overallRisk: string
  riskFactors: Array<{
    factor: string
    impact: number
    explanation: string
  }>
}

export default function PreoperativeRiskAssessment() {
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null)

  const handlePatientDataSubmit = (data: PatientData) => {
    setPatientData(data)

    // Simulate AI risk assessment calculation
    const assessment = calculateRiskAssessment(data)
    setRiskAssessment(assessment)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        <ProfessionalHeader />

        <Tabs defaultValue="assessment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border border-gray-200">
            <TabsTrigger value="assessment" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Risk Assessment
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="scheduling" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Scheduling
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PatientDataForm onSubmit={handlePatientDataSubmit} />
              {riskAssessment && <RiskAssessmentDashboard assessment={riskAssessment} patientData={patientData!} />}
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            {riskAssessment ? (
              <RiskFactorAnalysis assessment={riskAssessment} />
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Complete patient assessment to view AI analysis</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recommendations">
            {riskAssessment && patientData ? (
              <RecommendationsPanel assessment={riskAssessment} patientData={patientData} />
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Complete patient assessment to view recommendations</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="scheduling">
            {riskAssessment && patientData ? (
              <SchedulingIntegration assessment={riskAssessment} patientData={patientData} />
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Complete patient assessment to access scheduling</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function calculateRiskAssessment(data: PatientData): RiskAssessment {
  // Simulate AI risk calculation based on patient data
  let mortalityRisk = 2.5
  let infectionRisk = 8.0
  let bleedingRisk = 5.5
  let readmissionRisk = 12.0

  const riskFactors = []

  // Age factor
  if (data.demographics.age > 65) {
    mortalityRisk += 1.5
    infectionRisk += 2.0
    riskFactors.push({
      factor: "Advanced Age",
      impact: 0.8,
      explanation: "Age > 65 increases mortality and infection risk",
    })
  }

  // BMI factor
  if (data.demographics.bmi > 30) {
    infectionRisk += 3.0
    bleedingRisk += 1.5
    riskFactors.push({
      factor: "Obesity",
      impact: 0.6,
      explanation: "BMI > 30 increases infection and bleeding complications",
    })
  }

  // Comorbidities
  if (data.comorbidities.includes("Diabetes")) {
    infectionRisk += 4.0
    readmissionRisk += 3.0
    riskFactors.push({
      factor: "Diabetes",
      impact: 0.9,
      explanation: "Diabetes significantly increases infection risk and healing complications",
    })
  }

  if (data.comorbidities.includes("Hypertension")) {
    mortalityRisk += 0.8
    bleedingRisk += 2.0
    riskFactors.push({
      factor: "Hypertension",
      impact: 0.5,
      explanation: "Hypertension increases cardiovascular and bleeding risks",
    })
  }

  // Surgery complexity
  if (data.surgeryComplexity === "High") {
    mortalityRisk += 2.0
    infectionRisk += 3.0
    bleedingRisk += 4.0
    riskFactors.push({
      factor: "Complex Surgery",
      impact: 0.7,
      explanation: "High complexity surgery increases all risk categories",
    })
  }

  // Lab values
  if (data.labs.hemoglobin < 10) {
    mortalityRisk += 1.2
    bleedingRisk += 3.0
    riskFactors.push({
      factor: "Low Hemoglobin",
      impact: 0.6,
      explanation: "Anemia increases mortality and bleeding complications",
    })
  }

  const overallRisk = Math.max(mortalityRisk, infectionRisk, bleedingRisk, readmissionRisk)
  let riskLevel = "Low"
  if (overallRisk > 15) riskLevel = "High"
  else if (overallRisk > 8) riskLevel = "Moderate"

  return {
    mortalityRisk: Math.min(mortalityRisk, 25),
    infectionRisk: Math.min(infectionRisk, 30),
    bleedingRisk: Math.min(bleedingRisk, 25),
    readmissionRisk: Math.min(readmissionRisk, 35),
    overallRisk: riskLevel,
    riskFactors,
  }
}

function RiskFactorAnalysis({ assessment }: { assessment: RiskAssessment }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            SHAP Analysis - Risk Factor Contributions
          </CardTitle>
          <CardDescription>Explainable AI showing how each factor contributes to overall risk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessment.riskFactors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{factor.factor}</span>
                  <span className="text-sm text-muted-foreground">Impact: {(factor.impact * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${factor.impact * 100}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{factor.explanation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
