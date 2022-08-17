import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';

export function Success({ message }) {
  return (
    <div className='absolute bottom-10 left-10'>
      <Notification icon={<IconCheck size={18} />} color="teal" title="Teal notification">
        {message}
      </Notification>
    </div>
  )
}
export function fail({ message }) {
  return (
    <div className='absolute bottom-10 left-10'>
      <Notification icon={<IconCheck size={18} />} color="teal" title="Teal notification">
        {message}
      </Notification>
    </div>
  )
}