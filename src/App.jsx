import { useEffect, useState } from 'react'

function App() {
  const [contacts, setContacts] = useState([]);
  const [hash, setHash] = useState(window.location.hash.slice(1)*1)

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch("https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users");
      const json = await response.json();
      setContacts(json);
    }
    fetchData()
  }, [])
    useEffect(() => {
      window.addEventListener("hashchange", () => {
        setHash(window.location.hash.slice(1)*1)
      })
    }, [])
    const contact = contacts.find(contact => hash === contact.id);
  return (
    <>
      <h1>Contact List ({contacts.length})</h1>
      <ul className="all">
        {
          contacts.map((contact) => {
            return(
              <li key={contact.id} className={contact.id === hash ? "selected": ""}>
                <a href={`#${contact.id === hash ? "": contact.id}`}>
                  {contact.name}
                </a>
              </li>
            )
          })
        }
      </ul>
      {
        contact ? (<ul className="list">
          <li>Email: {contact.email}</li>
          <li>Company: {contact.company.name}</li>
          <li>Phone: {contact.phone}</li>
        </ul>) : null
      }
    </>
  )
}

export default App
