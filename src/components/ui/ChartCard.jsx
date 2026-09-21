import React from 'react'
import Card, { CardHeader } from './Card'

export default function ChartCard({ title, subtitle, icon, action, children, className = '' }) {
  return (
    <Card className={className}>
      <CardHeader title={title} subtitle={subtitle} icon={icon} action={action} />
      <div className="h-64 w-full">{children}</div>
    </Card>
  )
}
