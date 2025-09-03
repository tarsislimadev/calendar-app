import { useState, useEffect } from 'react'

const CalendarGrid = ({ currentDate, events, onDateClick, onEventClick }) => {
  const [calendarDays, setCalendarDays] = useState([])

  useEffect(() => {
    generateCalendarDays()
  }, [currentDate])

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)
    
    // Start from the first day of the week containing the first day of the month
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    // End at the last day of the week containing the last day of the month
    const endDate = new Date(lastDay)
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()))
    
    const days = []
    const currentDateIter = new Date(startDate)
    
    while (currentDateIter <= endDate) {
      days.push(new Date(currentDateIter))
      currentDateIter.setDate(currentDateIter.getDate() + 1)
    }
    
    setCalendarDays(days)
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const getDayEvents = (date) => {
    const dateKey = date.toDateString()
    return events[dateKey] || []
  }

  const getEventColor = (category) => {
    const colors = {
      work: 'bg-blue-500',
      personal: 'bg-green-500',
      health: 'bg-red-500',
      social: 'bg-purple-500',
      other: 'bg-gray-500'
    }
    return colors[category] || colors.other
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {dayNames.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7">
        {calendarDays.map((date, index) => {
          const dayEvents = getDayEvents(date)
          const isCurrentMonthDay = isCurrentMonth(date)
          const isTodayDate = isToday(date)

          return (
            <div
              key={index}
              className={`
                min-h-[120px] p-2 border-r border-b border-gray-100 cursor-pointer
                hover:bg-gray-50 transition-colors duration-150
                ${!isCurrentMonthDay ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                ${isTodayDate ? 'bg-blue-50 border-blue-200' : ''}
              `}
              onClick={() => onDateClick(date)}
            >
              {/* Date number */}
              <div className="flex justify-between items-start mb-1">
                <span
                  className={`
                    text-sm font-medium
                    ${isTodayDate ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}
                    ${!isCurrentMonthDay ? 'text-gray-400' : 'text-gray-900'}
                  `}
                >
                  {date.getDate()}
                </span>
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`
                      text-xs px-2 py-1 rounded text-white cursor-pointer
                      hover:opacity-80 transition-opacity duration-150
                      ${getEventColor(event.category)}
                    `}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick(event, date)
                    }}
                    title={event.title}
                  >
                    <div className="truncate font-medium">
                      {event.title}
                    </div>
                    {event.time && (
                      <div className="truncate opacity-90">
                        {event.time}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Show more indicator */}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 px-2">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid

