import { formatDistanceToNow, parseISO } from 'date-fns'

import { selectAllUsers } from '../../store/features/users/usersSlice.ts'

import {
  allNotificationsRead,
  selectMetadataEntities,
  useGetNotificationsQuery
} from '../../store/features/notifications/notificationsSlice.ts'
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useLayoutEffect} from "react";
import classnames from 'classnames';

export const NotificationsList = () => {
  const { data: notifications = [] } = useGetNotificationsQuery()
  const notificationsMetadata = useAppSelector(selectMetadataEntities)
  const users = useAppSelector(selectAllUsers)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    //In order to avoid flashing of old data
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknown User'
    }

    const metadata = notificationsMetadata[notification.id]

    const notificationClassname = classnames('notification', {
      new: metadata.isNew
    })

    return (
     <div key={notification.id} className={notificationClassname}>
       <div>
         <b>{user.name}</b> {notification.message}
       </div>
       <div title={notification.date}>
         <i>{timeAgo} ago</i>
       </div>
     </div>
    )
  })

  return (
   <section className="notificationsList">
     <h2>Notifications</h2>
     {renderedNotifications}
   </section>
  )
}
