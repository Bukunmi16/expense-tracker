import React from 'react'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'


const PaginationControls = ({page, totalPages, setPage}) => {
  return (
    <div className="flex items-center justify-between my-4 mb-12 ">
  <Button
    variant="outline"
    disabled={page === 1}
    onClick={() => setPage((prev) => prev - 1)}
  >
    <MinusIcon/>
  </Button>

  <span className="text-sm text-muted-foreground">
    Page {page} of {totalPages}
  </span>

  <Button
    variant="outline"
    disabled={page === totalPages}
    onClick={() => setPage((prev) => prev + 1)}
  >
    <PlusIcon/>
  </Button>
</div>
)
}

export default PaginationControls