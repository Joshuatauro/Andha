import axios from 'axios'

export default function CheckUserLoggedIn() {
  const { data } = axios.get('http://localhost:5000/api/auth/checkauthstatus')
  return data.isLoggedIn
}