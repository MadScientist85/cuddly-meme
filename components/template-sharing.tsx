"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IconShare, IconUsers, IconCopy, IconCheck, IconEye, IconEdit } from "@/components/ui/icons"
import type { Template, TemplateShare } from "@/lib/types/template"
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"

interface TemplateSharingProps {
  template: Template
  isOpen: boolean
  onClose: () => void
  onShare: (shareData: Omit<TemplateShare, "id" | "createdAt">) => void
}

export function TemplateSharing({ template, isOpen, onClose, onShare }: TemplateSharingProps) {
  const [shareType, setShareType] = useState<"public" | "private" | "group">("private")
  const [permissions, setPermissions] = useState<("view" | "edit" | "share")[]>(["view"])
  const [emailList, setEmailList] = useState("")
  const [message, setMessage] = useState("")
  const [expiresIn, setExpiresIn] = useState<string>("never")
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const handlePermissionToggle = (permission: "view" | "edit" | "share") => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((p) => p !== permission))
    } else {
      setPermissions([...permissions, permission])
    }
  }

  const handleShare = () => {
    const emails = emailList
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0)

    const expiresAt =
      expiresIn !== "never" ? new Date(Date.now() + Number.parseInt(expiresIn) * 24 * 60 * 60 * 1000) : undefined

    const shareData: Omit<TemplateShare, "id" | "createdAt"> = {
      templateId: template.id,
      sharedBy: "current-user", // This would come from auth context
      sharedWith: shareType === "public" ? [] : emails,
      shareType,
      permissions,
      expiresAt,
    }

    onShare(shareData)
    onClose()
  }

  const generateShareLink = () => {
    return `${window.location.origin}/templates/shared/${template.id}`
  }

  const handleCopyLink = () => {
    copyToClipboard(generateShareLink())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <IconShare className="h-5 w-5" />
            <span>Share Template</span>
          </DialogTitle>
          <DialogDescription>Share "{template.title}" with others</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Share Type */}
          <div>
            <Label className="text-base font-medium">Share Type</Label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="public"
                  name="shareType"
                  checked={shareType === "public"}
                  onChange={() => setShareType("public")}
                />
                <Label htmlFor="public" className="flex items-center space-x-2 cursor-pointer">
                  <IconUsers className="h-4 w-4" />
                  <span>Public - Anyone can discover and use this template</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="private"
                  name="shareType"
                  checked={shareType === "private"}
                  onChange={() => setShareType("private")}
                />
                <Label htmlFor="private" className="flex items-center space-x-2 cursor-pointer">
                  <IconUsers className="h-4 w-4" />
                  <span>Private - Share with specific people</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="group"
                  name="shareType"
                  checked={shareType === "group"}
                  onChange={() => setShareType("group")}
                />
                <Label htmlFor="group" className="flex items-center space-x-2 cursor-pointer">
                  <IconUsers className="h-4 w-4" />
                  <span>Group - Share with a specific group</span>
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Permissions */}
          <div>
            <Label className="text-base font-medium">Permissions</Label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconEye className="h-4 w-4" />
                  <span>View</span>
                </div>
                <Switch checked={permissions.includes("view")} onCheckedChange={() => handlePermissionToggle("view")} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconEdit className="h-4 w-4" />
                  <span>Edit</span>
                </div>
                <Switch checked={permissions.includes("edit")} onCheckedChange={() => handlePermissionToggle("edit")} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconShare className="h-4 w-4" />
                  <span>Share</span>
                </div>
                <Switch
                  checked={permissions.includes("share")}
                  onCheckedChange={() => handlePermissionToggle("share")}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Recipients (for private/group sharing) */}
          {shareType !== "public" && (
            <div>
              <Label htmlFor="emails">{shareType === "group" ? "Group Members" : "Email Addresses"}</Label>
              <Textarea
                id="emails"
                value={emailList}
                onChange={(e) => setEmailList(e.target.value)}
                placeholder="Enter email addresses separated by commas"
                rows={3}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">Separate multiple email addresses with commas</p>
            </div>
          )}

          {/* Message */}
          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message..."
              rows={3}
              className="mt-1"
            />
          </div>

          {/* Expiration */}
          <div>
            <Label htmlFor="expires">Link Expiration</Label>
            <Select value={expiresIn} onValueChange={setExpiresIn}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Never expires" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never expires</SelectItem>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="7">1 week</SelectItem>
                <SelectItem value="30">1 month</SelectItem>
                <SelectItem value="90">3 months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Share Link */}
          <div>
            <Label>Share Link</Label>
            <div className="flex space-x-2 mt-1">
              <Input value={generateShareLink()} readOnly className="flex-1" />
              <Button onClick={handleCopyLink} variant="outline" size="sm">
                {isCopied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleShare} disabled={shareType !== "public" && !emailList.trim()}>
            <IconShare className="h-4 w-4 mr-2" />
            Share Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
