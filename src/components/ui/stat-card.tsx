import { cn, formatCurrency, formatPercent } from '@/lib/utils'
import { Card, CardContent } from './card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number
  isCurrency?: boolean
  isPercent?: boolean
  change?: number
  changeLabel?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  accent?: boolean
}

export function StatCard({
  label, value, isCurrency = true, isPercent = false,
  change, changeLabel, className, size = 'md', accent = false,
}: StatCardProps) {
  const isPositive = change !== undefined ? change >= 0 : value >= 0
  const isNegative = change !== undefined ? change < 0 : value < 0

  const displayValue = isPercent
    ? `${value.toFixed(1)}%`
    : isCurrency
    ? formatCurrency(value)
    : value.toLocaleString()

  const ChangeIcon = change === 0 ? Minus : change && change > 0 ? TrendingUp : TrendingDown

  return (
    <Card className={cn(accent && 'border-emerald-500/30 bg-emerald-500/5', className)}>
      <CardContent className={size === 'sm' ? 'p-4' : size === 'lg' ? 'p-6' : 'p-5'}>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{label}</p>
        <p className={cn(
          'font-bold tabular-nums',
          size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl',
          accent ? 'text-emerald-400' : isNegative && isCurrency ? 'text-red-400' : 'text-gray-100'
        )}>
          {displayValue}
        </p>
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 mt-2 text-xs font-medium',
            change > 0 ? 'text-emerald-400' : change < 0 ? 'text-red-400' : 'text-gray-500'
          )}>
            <ChangeIcon className="w-3 h-3" />
            <span>{formatPercent(change)} {changeLabel || 'vs last month'}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
