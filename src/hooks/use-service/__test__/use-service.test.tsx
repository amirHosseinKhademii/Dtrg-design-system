import { act, renderHook } from '@testing-library/react-hooks'
import { mockServer, wrapper, rest, mockCycles } from 'test/mock'
import { ApiBaseurl } from 'utils'
import { useService } from '..'

const worker = mockServer('url-for-test')

const { result: service } = renderHook(() => useService(), {
  wrapper,
})

describe('Use service', () => {
  mockCycles(worker)
  it('Should return proper data on get', async () => {
    const { result, waitFor } = renderHook(
      () =>
        service.current.useGet({
          key: ['test'],
          url: 'url-for-test',
        }),
      {
        wrapper,
      }
    )
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data.data).toBe('Success get')
  })
  it('Should return proper data on post', async () => {
    const { result, waitFor } = renderHook(
      () =>
        service.current.usePost({
          url: 'url-for-test',
        }),
      {
        wrapper,
      }
    )
    act(() => result.current.mutate({ payload: { id: 1, name: 'dtrg' } }))
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data.data).toStrictEqual({ id: 1, name: 'dtrg' })
  })
  it('Should return proper data on put', async () => {
    const { result, waitFor } = renderHook(
      () =>
        service.current.usePut({
          url: 'url-for-test',
        }),
      {
        wrapper,
      }
    )
    act(() => result.current.mutate({ payload: { id: 3, name: 'doris' } }))
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data.data).toStrictEqual({ id: 3, name: 'doris' })
  })
  it('Should return proper data on delete', async () => {
    const { result, waitFor } = renderHook(
      () =>
        service.current.useDelete({
          url: 'url-for-test',
        }),
      {
        wrapper,
      }
    )
    act(() => result.current.mutate(''))
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data.data).toBe('Success delete')
  })
  it('Should throw an error on bad delete req', async () => {
    worker.use(
      rest.delete(`${ApiBaseurl.dev}/url-for-test`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server error dtrg' }))
      })
    )
    const { result, waitFor } = renderHook(
      () =>
        service.current.useDelete({
          url: 'url-for-test',
        }),
      {
        wrapper,
      }
    )
    act(() => result.current.mutate(''))
    jest.spyOn(console, 'error').mockImplementation(() => {})
    await waitFor(() => result.current.isError)
    expect(result.current.error?.response?.data?.error).toBe(
      'Server error dtrg'
    )
  })
})
