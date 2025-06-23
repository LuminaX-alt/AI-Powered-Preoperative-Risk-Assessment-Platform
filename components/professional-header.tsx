"use client"

import { Activity, Brain, Shield, Zap } from "lucide-react"

export function ProfessionalHeader() {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-8 px-4 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                LuminaX-alt
              </h1>
              <p className="text-blue-200 font-medium text-lg">AI-Powered Preoperative Risk Assessment Platform</p>
              <p className="text-blue-300 text-sm mt-1">Advanced Clinical Decision Support System</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-2 text-blue-200">
              <Brain className="h-5 w-5" />
              <span className="text-sm">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200">
              <Shield className="h-5 w-5" />
              <span className="text-sm">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200">
              <Zap className="h-5 w-5" />
              <span className="text-sm">Real-time Analysis</span>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-200">99.2%</div>
            <div className="text-blue-300 text-sm">Prediction Accuracy</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-200">15%</div>
            <div className="text-blue-300 text-sm">Reduced Complications</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-200">24/7</div>
            <div className="text-blue-300 text-sm">Clinical Support</div>
          </div>
        </div>
      </div>
    </div>
  )
}
