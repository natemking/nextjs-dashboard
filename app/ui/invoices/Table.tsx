import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/Buttons';
import { InvoiceStatus } from '@/app/ui/invoices/Status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';

export async function InvoicesTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}): Promise<React.JSX.Element> {
    const invoices = await fetchFilteredInvoices(query, currentPage);

    return (
        <div className='mt-6 flow-root'>
            <div className='inline-block min-w-full align-middle'>
                <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
                    <div className='md:hidden'>
                        {invoices.map(invoice => (
                            <div
                                className='mb-2 w-full rounded-md bg-white p-4'
                                key={invoice.id}
                            >
                                <div className='flex items-center justify-between border-b pb-4'>
                                    <div>
                                        <div className='mb-2 flex items-center'>
                                            <Image
                                                alt={`${invoice.name}'s profile picture`}
                                                className='mr-2 rounded-full'
                                                height={28}
                                                src={invoice.image_url}
                                                width={28}
                                            />
                                            <p>{invoice.name}</p>
                                        </div>
                                        <p className='text-sm text-gray-500'>{invoice.email}</p>
                                    </div>
                                    <InvoiceStatus status={invoice.status} />
                                </div>
                                <div className='flex w-full items-center justify-between pt-4'>
                                    <div>
                                        <p className='text-xl font-medium'>
                                            {formatCurrency(invoice.amount)}
                                        </p>
                                        <p>{formatDateToLocal(invoice.date)}</p>
                                    </div>
                                    <div className='flex justify-end gap-2'>
                                        <UpdateInvoice id={invoice.id} />
                                        <DeleteInvoice id={invoice.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className='hidden min-w-full text-gray-900 md:table'>
                        <thead className='rounded-lg text-left text-sm font-normal'>
                            <tr>
                                <th
                                    className='px-4 py-5 font-medium sm:pl-6'
                                    scope='col'
                                >
                                    Customer
                                </th>
                                <th
                                    className='px-3 py-5 font-medium'
                                    scope='col'
                                >
                                    Email
                                </th>
                                <th
                                    className='px-3 py-5 font-medium'
                                    scope='col'
                                >
                                    Amount
                                </th>
                                <th
                                    className='px-3 py-5 font-medium'
                                    scope='col'
                                >
                                    Date
                                </th>
                                <th
                                    className='px-3 py-5 font-medium'
                                    scope='col'
                                >
                                    Status
                                </th>
                                <th
                                    className='relative py-3 pr-3 pl-6'
                                    scope='col'
                                >
                                    <span className='sr-only'>Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {invoices.map(invoice => (
                                <tr
                                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                                    key={invoice.id}
                                >
                                    <td className='py-3 pr-3 pl-6 whitespace-nowrap'>
                                        <div className='flex items-center gap-3'>
                                            <Image
                                                alt={`${invoice.name}'s profile picture`}
                                                className='rounded-full'
                                                height={28}
                                                src={invoice.image_url}
                                                width={28}
                                            />
                                            <p>{invoice.name}</p>
                                        </div>
                                    </td>
                                    <td className='px-3 py-3 whitespace-nowrap'>{invoice.email}</td>
                                    <td className='px-3 py-3 whitespace-nowrap'>
                                        {formatCurrency(invoice.amount)}
                                    </td>
                                    <td className='px-3 py-3 whitespace-nowrap'>
                                        {formatDateToLocal(invoice.date)}
                                    </td>
                                    <td className='px-3 py-3 whitespace-nowrap'>
                                        <InvoiceStatus status={invoice.status} />
                                    </td>
                                    <td className='py-3 pr-3 pl-6 whitespace-nowrap'>
                                        <div className='flex justify-end gap-3'>
                                            <UpdateInvoice id={invoice.id} />
                                            <DeleteInvoice id={invoice.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
