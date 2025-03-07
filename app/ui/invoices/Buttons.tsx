import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateInvoice(): React.JSX.Element {
    return (
        <Link
            className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            href='/dashboard/invoices/create'
        >
            <span className='hidden md:block'>Create Invoice</span>{' '}
            <PlusIcon className='h-5 md:ml-4' />
        </Link>
    );
}

export function UpdateInvoice({ id }: { id: string }): React.JSX.Element {
    console.log(id);
    return (
        <Link
            className='rounded-md border p-2 hover:bg-gray-100'
            href='/dashboard/invoices'
        >
            <PencilIcon className='w-5' />
        </Link>
    );
}

export function DeleteInvoice({ id }: { id: string }): React.JSX.Element {
    console.log(id);
    return (
        <button
            className='rounded-md border p-2 hover:bg-gray-100'
            type='submit'
        >
            <span className='sr-only'>Delete</span>
            <TrashIcon className='w-5' />
        </button>
    );
}
