import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a random nanoid-style string
export function nanoid(size = 21): string {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  let id = ""
  for (let i = 0; i < size; i++) {
    id += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return id
}

// Format date to a readable string
export function formatDate(date: Date | string | number): string {
  const d = new Date(date)

  if (isNaN(d.getTime())) {
    return "Invalid Date"
  }

  const now = new Date()
  const diffInMs = now.getTime() - d.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return "Today"
  } else if (diffInDays === 1) {
    return "Yesterday"
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return `${months} month${months > 1 ? "s" : ""} ago`
  } else {
    const years = Math.floor(diffInDays / 365)
    return `${years} year${years > 1 ? "s" : ""} ago`
  }
}

// Additional utility function for absolute date formatting
export function formatAbsoluteDate(date: Date | string | number): string {
  const d = new Date(date)

  if (isNaN(d.getTime())) {
    return "Invalid Date"
  }

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Utility function for truncating text
export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

// Utility function for capitalizing first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
