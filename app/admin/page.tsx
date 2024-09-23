import { DataTable } from '@/components/DataTable'
import StatCard from '@/components/StatCard'
import { columns } from '@/components/table/columns'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Admin = async () => {
    const appointments = await getRecentAppointmentList();
    

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='admin-header'>
            <Link 
                href='/'
                className='cursor-pointer'
            >
                <Image
                    src="/assets/icons/logo-icon.svg"
                    height={50}
                    width={150}
                    alt="logo"
                    className='h-8 w-fit'
                />
            </Link>

            <p className='text-16-semibold'>
                Admin Dashboard
            </p>
        </header>

        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>
                    Good morning! 
                </h1>
                <p className='text-dark-700'>
                    Welcome to the admin dashboard. Here, you can manage your users, view their transactions, and more.
                </p>
            </section>
            <section className='admin-stat'>
                <StatCard 
                    type='appointments'
                    count={appointments.scheduleCount}
                    label='Schedule Appointments'
                    icon='/assets/icons/appointments.svg'
                />
                <StatCard 
                    type='pending'
                    count={appointments.pendingCount}
                    label='Pending Appointments'
                    icon='/assets/icons/pending.svg'
                />
                <StatCard 
                    type='cancelled'
                    count={appointments.cancelledCount}
                    label='Cancelled Appointments'
                    icon='/assets/icons/cancelled.svg'
                />
            </section>

            <DataTable 
                data={appointments.documents}                
                columns={columns}
                

            />
        </main>
    </div>
  )
}

export default Admin