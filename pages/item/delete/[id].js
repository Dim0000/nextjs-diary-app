import useAuth from "../../../utils/useAuth"
import Head from "next/head"

const DeleteItem = (props) => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://nextjs-diary-app.vercel.app/api/item/delete/${props.singleItem._id}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })
      const jsonData = await response.json()
      alert(jsonData.message)
    } catch (err) {
      alert("アイテム削除失敗")
    }
  }

  const loginUser = useAuth()


  if (loginUser === props.singleItem.email) {
    return (
      <div>
        <Head><title>アイテム削除</title></Head>
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{props.singleItem.title}</h2>
          <p>{props.singleItem.description}</p>
          <button>削除</button>
        </form>
      </div>
    )
  } else {
    return <h1>権限がありません</h1>
  }
}

export default DeleteItem

export const getServerSideProps = async (context) => {
  const response = await fetch(`https://nextjs-diary-app.vercel.app/api/item/${context.query.id}`)
  const singleItem = await response.json()

  return {
    props: singleItem
  }
}