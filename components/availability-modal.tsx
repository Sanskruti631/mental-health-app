"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface AvailabilityModalProps {
  isOpen: boolean
  onClose: () => void
  currentStatus: string
  nextAvailable: string
  todaySchedule: Array<{ time: string; status: string }>
  onUpdate: (data: any) => void
}

export function AvailabilityModal({
  isOpen,
  onClose,
  currentStatus,
  nextAvailable,
  todaySchedule,
  onUpdate
}: AvailabilityModalProps) {
  const [status, setStatus] = useState(currentStatus)
  const [nextAvail, setNextAvail] = useState(nextAvailable)
  const [schedule, setSchedule] = useState(todaySchedule)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleSave = async () => {
    setIsUpdating(true)
    try {
      const response = await fetch('/api/counsellor/availability', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentStatus: status,
          nextAvailable: nextAvail,
          todaySchedule: schedule,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        onUpdate(result.availability)
        onClose()
      } else {
        console.error('Failed to update availability')
      }
    } catch (error) {
      console.error('Error updating availability:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const toggleTimeSlot = (index: number) => {
    const newSchedule = [...schedule]
    newSchedule[index].status = newSchedule[index].status === 'available' ? 'unavailable' : 'available'
    setSchedule(newSchedule)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Set Availability</DialogTitle>
          <DialogDescription>
            Update your availability status and schedule for today.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Current Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextAvailable">Next Available</Label>
            <Select value={nextAvail} onValueChange={setNextAvail}>
              <SelectTrigger>
                <SelectValue placeholder="Select next available time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tomorrow 9:00 AM">Tomorrow 9:00 AM</SelectItem>
                <SelectItem value="Tomorrow 10:00 AM">Tomorrow 10:00 AM</SelectItem>
                <SelectItem value="Tomorrow 11:00 AM">Tomorrow 11:00 AM</SelectItem>
                <SelectItem value="Tomorrow 2:00 PM">Tomorrow 2:00 PM</SelectItem>
                <SelectItem value="Monday 9:00 AM">Monday 9:00 AM</SelectItem>
                <SelectItem value="Not available this week">Not available this week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Today's Schedule</Label>
            <div className="grid grid-cols-2 gap-2">
              {schedule.map((slot, index) => (
                <Button
                  key={index}
                  variant={slot.status === 'available' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleTimeSlot(index)}
                  className="justify-start"
                >
                  <span className="text-xs">{slot.time}</span>
                  <Badge
                    variant={slot.status === 'available' ? 'default' : 'secondary'}
                    className="ml-2 text-xs"
                  >
                    {slot.status === 'available' ? 'Available' : slot.status === 'booked' ? 'Booked' : 'Unavailable'}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}