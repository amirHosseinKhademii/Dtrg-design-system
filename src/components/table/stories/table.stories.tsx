import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Table } from 'components/table'
import { useState } from 'react'

type TTableData = {
  id: number
  first_name: string
  last_name: string
  email: string
}[]

export default {
  title: 'Components/Table',
  component: Table,
} as ComponentMeta<typeof Table>

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

const data: TTableData = [
  { id: 1, first_name: 'Amir', last_name: 'Khademi', email: 'a@gmail.com' },
  { id: 2, first_name: 'Sina', last_name: 'Sazegar', email: 's@gmail.com' },
  { id: 3, first_name: 'Sara', last_name: 'Ghadami', email: 'g@gmail.com' },
  { id: 4, first_name: 'meisam', last_name: 'esmaeili', email: 'm@gmail.com' },
]

const paginateData: TTableData = [
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
  { id: 14, first_name: 'Sina', last_name: 'Sazegar', email: 's@gmail.com' },
  { id: 15, first_name: 'Sara', last_name: 'Ghadami', email: 'g@gmail.com' },
  { id: 16, first_name: 'meisam', last_name: 'esmaeili', email: 'm@gmail.com' },
]

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

export const NoData = Template.bind({})

NoData.args = {
  columns,
  data: [],
}

export const Simple = Template.bind({})

Simple.args = {
  columns,
  data,
}

export const Paginate = (args: ITable) => {
  const [page, setPage] = useState(1)

  return (
    <Table
      {...args}
      onPaginate={(p) => setPage(p)}
      page={page}
      data={paginateData.slice((page - 1) * 10, page * 10)}
    />
  )
}

Paginate.args = {
  columns,
  total: paginateData.length,
}
