
export default function togglePreference() {
  let userPreference = localStorage.getItem('theme')

  const root = window.document.documentElement

  if(userPreference === 'dark'){
    root.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  } else {
    root.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }
}