export type PostType = {
    id: number
    postText: string
    image: string | null
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    status: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type FriendType = {
    id: number
    name: string
}

export type DialogType = {
    id: number
    userId: number
    name: string
  }
  
export type MessageType = {
    messageId: number
    dialogsId: number
    userId: number | null
    messageText: string
  } 