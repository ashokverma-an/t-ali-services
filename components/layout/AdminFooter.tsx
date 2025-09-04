import { Shield, Code, Users } from 'lucide-react'

export default function AdminFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 py-3 sm:py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-0">
          <div className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
            <span className="text-center sm:text-left">© 2025 T ALI Platform. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Code className="w-3 h-3 sm:w-4 sm:h-4 text-uber-green flex-shrink-0" />
            <span className="whitespace-nowrap">Developed by</span>
            <span className="font-semibold text-uber-green whitespace-nowrap">Team TechRover</span>
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-uber-green flex-shrink-0" />
          </div>
        </div>
      </div>
    </footer>
  )
}