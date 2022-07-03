import { render, screen } from '@testing-library/react'
import event from '@testing-library/user-event'
import { useState } from 'react'
import { Table } from '..'

const columns = [
  {
    key: 'first_name',
    head: 'First name',
    width: 'w-1/3',
  },
  {
    key: 'last_name',
    head: 'last name',
    width: 'w-1/3',
  },
  {
    key: 'email',
    head: 'Email',
    width: 'w-1/3',
  },
  {
    key: '',
    head: 'Actions',
  },
]

const data = [
  { id: 1, first_name: 'Amir', last_name: 'Khademi', email: 'a@gmail.com' },
  { id: 2, first_name: 'Sina', last_name: 'Sazegar', email: 's@gmail.com' },
  { id: 3, first_name: 'Sara', last_name: 'Ghadami', email: 'g@gmail.com' },
  { id: 4, first_name: 'meisam', last_name: 'esmaeili', email: 'm@gmail.com' },
]

const paginateData = [
  { id: 1, first_name: 'Amir', last_name: 'Khademi', email: 'a@gmail.com' },
  { id: 2, first_name: 'Sina', last_name: 'Sazegar', email: 's@gmail.com' },
  { id: 3, first_name: 'Sara', last_name: 'Ghadami', email: 'g@gmail.com' },
  { id: 4, first_name: 'meisam', last_name: 'esmaeili', email: 'm@gmail.com' },
  { id: 5, first_name: 'Amir', last_name: 'Khademi', email: 'a@gmail.com' },
  { id: 6, first_name: 'Sina', last_name: 'Sazegar', email: 's@gmail.com' },
  { id: 7, first_name: 'Sara', last_name: 'Ghadami', email: 'g@gmail.com' },
  { id: 8, first_name: 'meisam', last_name: 'esmaeili', email: 'm@gmail.com' },
  { id: 9, first_name: 'Amir', last_name: 'Khademi', email: 'a@gmail.com' },
  { id: 10, first_name: 'Sina', last_name: 'Sazegar', email: 's@gmail.com' },
  { id: 11, first_name: 'Sara', last_name: 'Ghadami', email: 'g@gmail.com' },
  { id: 12, first_name: 'meisam', last_name: 'esmaeili', email: 'm@gmail.com' },
  { id: 13, first_name: 'Amir', last_name: 'Khademi', email: 'a@gmail.com' },
]

const TableWithPaginate = () => {
  const [page, setPage] = useState(1)

  return (
    <Table
      columns={columns}
      onPaginate={(p) => setPage(p)}
      page={page}
      total={paginateData.length}
      data={paginateData.slice((page - 1) * 10, page * 10)}
    />
  )
}

describe('Table', () => {
  it('Should render table properly', () => {
    render(<Table columns={columns} data={data} page={1} total={data.length} />)
    const heads = screen.getAllByRole('heading')
    const rows = screen.getAllByRole('row')
    const cells = screen.getAllByRole('cell')
    const rowHeader = screen.getByRole('rowheader')
    expect(heads).toHaveLength(4)
    expect(rowHeader).toBeInTheDocument()
    expect(cells).toHaveLength(16)
    expect(rows).toHaveLength(4)
  })
  it('Should paginate table properly', () => {
    render(<TableWithPaginate />)
    const rows = screen.getAllByRole('row')
    const buttons = screen.getAllByRole('button')
    const page2 = screen.getByRole('button', { name: '2' })
    expect(buttons).toHaveLength(2)
    expect(rows).toHaveLength(10)
    expect(page2).not.toHaveClass('bg-secondary text-white')
    event.click(page2)
    expect(page2).toHaveClass('bg-secondary text-white')
  })
})
