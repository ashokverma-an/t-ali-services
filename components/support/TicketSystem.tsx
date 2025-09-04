'use client'

import { useState } from 'react'
import { Ticket, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function TicketSystem() {
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Payment Issue', status: 'open', priority: 'high', date: '2024-01-15', messages: 3 },
    { id: 2, title: 'Driver Not Found', status: 'resolved', priority: 'medium', date: '2024-01-14', messages: 5 },
    { id: 3, title: 'App Crash', status: 'in_progress', priority: 'low', date: '2024-01-13', messages: 2 }
  ])
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [newTicket, setNewTicket] = useState({ title: '', description: '', priority: 'medium' })

  const createTicket = () => {
    const ticket = {
      id: Date.now(),
      title: newTicket.title,
      status: 'open',
      priority: newTicket.priority,
      date: new Date().toISOString().split('T')[0],
      messages: 1
    }
    setTickets([ticket, ...tickets])
    setNewTicket({ title: '', description: '', priority: 'medium' })
    setShowNewTicket(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100'
      case 'in_progress': return 'text-yellow-600 bg-yellow-100'
      case 'resolved': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
        <Button onClick={() => setShowNewTicket(true)}>
          <Ticket className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {showNewTicket && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Create New Ticket</h3>
          <div className="space-y-4">
            <Input
              placeholder="Ticket Title"
              value={newTicket.title}
              onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
            />
            <textarea
              placeholder="Describe your issue..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-gray-900"
              value={newTicket.description}
              onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
            />
            <select
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
              value={newTicket.priority}
              onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <div className="flex space-x-3">
              <Button onClick={createTicket}>Create Ticket</Button>
              <Button variant="outline" onClick={() => setShowNewTicket(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Ticket className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">#{ticket.id} - {ticket.title}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-gray-600">{ticket.date}</span>
                    <div className="flex items-center space-x-1">
                      {getPriorityIcon(ticket.priority)}
                      <span className="text-sm capitalize text-gray-600">{ticket.priority}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{ticket.messages}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace('_', ' ')}
                </span>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}