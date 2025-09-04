import { Users, Code } from 'lucide-react'

export default function UserFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span>© 2025 T ALI Platform. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <Code className="w-4 h-4 text-uber-green" />
            <span>Developed by</span>
            <span className="font-semibold text-uber-green">Team TechRover</span>
            <Users className="w-4 h-4 text-uber-green ml-2" />
          </div>
        </div>
      </div>
    </footer>
  )
}