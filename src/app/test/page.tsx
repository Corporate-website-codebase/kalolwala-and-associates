"use client"
import ReportShowcase from '@/components/services/ReportShowcase'
import VideoRequestModal from '@/components/services/VideoRequestModal'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
    <ReportShowcase/>
    <VideoRequestModal isOpen={false} onClose={() => {}} videoTitle="hello"/>
    </>
  )
}

export default page