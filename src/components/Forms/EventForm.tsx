import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { format } from "date-fns";
import { Event } from "../types";

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Omit<Event, "id">) => void;
  selectedDate?: Date;
  editEvent?: Event;
}

function EventForm({
  isOpen,
  onClose,
  onSubmit,
  selectedDate,
  editEvent,
}: EventFormProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("12:00");
  const [description, setDescription] = useState("");
  const [assignedPeople, setAssignedPeople] = useState<string[]>([]);
  const [newPerson, setNewPerson] = useState("");

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setTime(format(new Date(editEvent.date), "HH:mm"));
      setDescription(editEvent.description);
      setAssignedPeople(editEvent.assignedPeople);
    } else {
      setTitle("");
      setTime("12:00");
      setDescription("");
      setAssignedPeople([]);
    }
  }, [editEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = selectedDate || new Date();
    const [hours, minutes] = time.split(":").map(Number);
    const eventDate = new Date(date);
    eventDate.setHours(hours, minutes);

    onSubmit({
      title,
      date: eventDate,
      description,
      assignedPeople,
    });

    setTitle("");
    setTime("12:00");
    setAssignedPeople([]);
    onClose();
  };

  const handleAddPerson = () => {
    if (newPerson.trim() && !assignedPeople.includes(newPerson.trim())) {
      setAssignedPeople([...assignedPeople, newPerson.trim()]);
      setNewPerson("");
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">
              {editEvent ? "Edit Event" : "Add New Event"}
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Add a description..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned People
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newPerson}
                  onChange={(e) => setNewPerson(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md"
                  placeholder="Enter name"
                />
                <button
                  type="button"
                  onClick={handleAddPerson}
                  className="px-4 py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {assignedPeople.map((person, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                  >
                    <span>{person}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setAssignedPeople(
                          assignedPeople.filter((_, i) => i !== index)
                        )
                      }
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400"
              >
                {editEvent ? "Update Event" : "Create Event"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default EventForm;
