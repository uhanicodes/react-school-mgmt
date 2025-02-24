export default function Student({ name, clazz, roll }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{clazz}</p>
      <p>{roll}</p>
    </div>
  )
}