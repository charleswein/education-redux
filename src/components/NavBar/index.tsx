import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchNotifications, selectAllNotifications} from "../../store/features/notifications/notificationsSlice.ts";
import {ReactNode} from "react";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectAllNotifications)
  const numberUnreadNotifications = notifications.filter(n => !n.read).length

  let unreadNotificationsBadge: ReactNode;

  if (numberUnreadNotifications > 0) {
    unreadNotificationsBadge = (
     <span className="badge">{numberUnreadNotifications}</span>
    )
  }

  console.log(numberUnreadNotifications, notifications, unreadNotificationsBadge)

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
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
         <button className="round-button small-container" onClick={fetchNewNotifications}>
           Refresh Notifications
         </button>
       </div>
     </section>
   </nav>
  )
}
