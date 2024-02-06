import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {
  fetchNotificationsWebsocket,
  selectNotificationsMetadata,
  useGetNotificationsQuery
} from "../../store/features/notifications/notificationsSlice.ts";
import {ReactNode} from "react";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const notificationsMetadata = useAppSelector(selectNotificationsMetadata)
  const numberUnreadNotifications = notificationsMetadata.filter(notificationMetadata => !notificationMetadata.read).length

  useGetNotificationsQuery()

  let unreadNotificationsBadge: ReactNode;

  const fetchNewNotifications = () => {
    dispatch(fetchNotificationsWebsocket())
  }

  if (numberUnreadNotifications > 0) {
    unreadNotificationsBadge = (
     <span className="badge">{numberUnreadNotifications}</span>
    )
  }

  return (
   <nav>
     <section>
       <div className="navContent">
         <div className="navLinks">
           <Link to="/">Posts</Link>
           <Link to="/users">Users</Link>
           <Link to="/notifications">Notifications {unreadNotificationsBadge}</Link>
         </div>
         <button className="button" onClick={fetchNewNotifications}>
           Refresh Notifications
         </button>
       </div>
     </section>
   </nav>
  )
}
