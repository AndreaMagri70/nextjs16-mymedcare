'use client'

import { useUser } from '@clerk/nextjs'
import AiChatSidebar from './AiChatSidebar'


export default function ConditionalChatbot() {
  const { isSignedIn } = useUser()
  
  // Mostra solo se l'utente è loggato
  if (!isSignedIn) return null
  
  return <AiChatSidebar />
}