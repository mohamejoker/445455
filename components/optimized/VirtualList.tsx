"use client"

import type React from "react"

import { memo, useMemo } from "react"
import { useVirtualScroll } from "@/lib/performance"

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  height: number
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
}

function VirtualList<T>({ items, itemHeight, height, renderItem, className = "" }: VirtualListProps<T>) {
  const { visibleItems, handleScroll } = useVirtualScroll(items, itemHeight, height)

  const listItems = useMemo(() => {
    return visibleItems.items.map((item, index) => (
      <div key={visibleItems.startIndex + index} style={{ height: itemHeight }} className="flex-shrink-0">
        {renderItem(item, visibleItems.startIndex + index)}
      </div>
    ))
  }, [visibleItems, itemHeight, renderItem])

  return (
    <div className={`overflow-auto ${className}`} style={{ height }} onScroll={handleScroll}>
      <div style={{ height: visibleItems.totalHeight, position: "relative" }}>
        <div
          style={{
            transform: `translateY(${visibleItems.offsetY}px)`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {listItems}
        </div>
      </div>
    </div>
  )
}

export default memo(VirtualList) as typeof VirtualList
