"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock } from "lucide-react"

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: () => void
}

interface Appointment {
  id: number
  time: string
  clientName: string
  sessionType: string
  focus: string
  status: string
}

export function ScheduleModal({ isOpen, onClose, onUpdate }: ScheduleModalProps) {
  const [schedule, setSchedule] = useState<{ today: Appointment[]; tomorrow: Appointment[] }>({
    today: [],
    tomorrow: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow'>('today')

  useEffect(() => {
    if (isOpen) {
      fetchSchedule()
    }
  }, [isOpen])

  const fetchSchedule = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/counsellor/schedule')
      if (response.ok) {
        const data = await response.json()
        setSchedule(data)
      }
    } catch (error) {
      console.error('Error fetching schedule:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsUpdating(true)
    try {
      const response = await fetch('/api/counsellor/schedule', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          appointments: schedule[selectedDate],
        }),
      })

      if (response.ok) {
        onUpdate()
        onClose()
      } else {
        console.error('Failed to update schedule')
      }
    } catch (error) {
      console.error('Error updating schedule:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const updateAppointment = (date: 'today' | 'tomorrow', index: number, field: string, value: string) => {
    const newSchedule = { ...schedule }
    newSchedule[date][index] = { ...newSchedule[date][index], [field]: value }
    setSchedule(newSchedule)
  }

  const currentSchedule = schedule[selectedDate]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Update Schedule
          </DialogTitle>
          <DialogDescription>
            Modify your appointments and availability for today and tomorrow.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button
              variant={selectedDate === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDate('today')}
            >
              Today
            </Button>
            <Button
              variant={selectedDate === 'tomorrow' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDate('tomorrow')}
            >
              Tomorrow
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">Loading schedule...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentSchedule.map((appointment, index) => (
                <div key={appointment.id} className="p-3 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                    <Badge className={
                      appointment.status === 'completed' ? 'bg-green-500' :
                      appointment.status === 'upcoming' ? 'bg-blue-500' :
                      appointment.status === 'new-client' ? 'bg-purple-500' :
                      appointment.status === 'available' ? 'bg-gray-500' :
                      'bg-red-500'
                    }>
                      {appointment.status === 'completed' ? 'Completed' :
                       appointment.status === 'upcoming' ? 'Upcoming' :
                       appointment.status === 'new-client' ? 'New Client' :
                       appointment.status === 'available' ? 'Available' :
                       'Booked'}
                    </Badge>
                  </div>

                  {appointment.status !== 'available' && (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`client-${index}`} className="text-xs">Client Name</Label>
                          <Input
                            id={`client-${index}`}
                            value={appointment.clientName}
                            onChange={(e) => updateAppointment(selectedDate, index, 'clientName', e.target.value)}
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`type-${index}`} className="text-xs">Session Type</Label>
                          <Select
                            value={appointment.sessionType}
                            onValueChange={(value) => updateAppointment(selectedDate, index, 'sessionType', value)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Initial Consultation">Initial Consultation</SelectItem>
                              <SelectItem value="Follow-up">Follow-up</SelectItem>
                              <SelectItem value="Assessment">Assessment</SelectItem>
                              <SelectItem value="Crisis Intervention">Crisis Intervention</SelectItem>
                              <SelectItem value="Group Session">Group Session</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor={`focus-${index}`} className="text-xs">Focus Area</Label>
                        <Select
                          value={appointment.focus}
                          onValueChange={(value) => updateAppointment(selectedDate, index, 'focus', value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Anxiety">Anxiety</SelectItem>
                            <SelectItem value="Depression">Depression</SelectItem>
                            <SelectItem value="Trauma & PTSD">Trauma & PTSD</SelectItem>
                            <SelectItem value="Academic Stress">Academic Stress</SelectItem>
                            <SelectItem value="Relationship Issues">Relationship Issues</SelectItem>
                            <SelectItem value="Career Counseling">Career Counseling</SelectItem>
                            <SelectItem value="General Counseling">General Counseling</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Save Schedule'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}