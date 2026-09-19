type UserCardProps = {
  name: string
  jobTitle?: string
  isOnline: boolean
}

function UserCard({name, jobTitle, isOnline}: UserCardProps) {
  return (
    <div>
      <p>Name: {name}</p>
      {jobTitle && <p>Job title: {jobTitle}</p>}
      <p>Is online: {isOnline ? 'Online' : 'Offline'} </p>
    </div>
  )
}

export default UserCard