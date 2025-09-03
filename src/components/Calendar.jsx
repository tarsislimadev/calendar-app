import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CalendarGrid from './CalendarGrid'
import EventModal from './EventModal'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendar-events')
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    }
  }, [])

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events))
  }, [events])

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setEditingEvent(null)
    setIsModalOpen(true)
  }

  const handleEventClick = (event, date) => {
    setSelectedDate(date)
    setEditingEvent(event)
    setIsModalOpen(true)
  }

  const handleSaveEvent = (eventData) => {
    const dateKey = selectedDate.toDateString()
    
    if (editingEvent) {
      // Update existing event
      const updatedEvents = { ...events }
      const dayEvents = updatedEvents[dateKey] || []
      const eventIndex = dayEvents.findIndex(e => e.id === editingEvent.id)
      if (eventIndex !== -1) {
        dayEvents[eventIndex] = { ...eventData, id: editingEvent.id }
        updatedEvents[dateKey] = dayEvents
        setEvents(updatedEvents)
      }
    } else {
      // Add new event
      const newEvent = {
        ...eventData,
        id: Date.now().toString()
      }
      
      const updatedEvents = { ...events }
      if (!updatedEvents[dateKey]) {
        updatedEvents[dateKey] = []
      }
      updatedEvents[dateKey].push(newEvent)
      setEvents(updatedEvents)
    }
    
    setIsModalOpen(false)
    setEditingEvent(null)
  }

  const handleDeleteEvent = (eventId) => {
    const dateKey = selectedDate.toDateString()
    const updatedEvents = { ...events }
    if (updatedEvents[dateKey]) {
      updatedEvents[dateKey] = updatedEvents[dateKey].filter(e => e.id !== eventId)
      if (updatedEvents[dateKey].length === 0) {
        delete updatedEvents[dateKey]
      }
      setEvents(updatedEvents)
    }
    setIsModalOpen(false)
    setEditingEvent(null)
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>
          <Button
            onClick={goToToday}
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Today
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => navigateMonth(-1)}
            variant="outline"
            size="sm"
            className="p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => navigateMonth(1)}
            variant="outline"
            size="sm"
            className="p-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <CalendarGrid
        currentDate={currentDate}
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />

      {/* Floating Action Button */}
      <Button
        onClick={() => {
          setSelectedDate(new Date())
          setEditingEvent(null)
          setIsModalOpen(true)
        }}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        size="sm"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        editingEvent={editingEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  )
}

export default Calendar

