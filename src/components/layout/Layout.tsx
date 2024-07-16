export default function Layout(props: {children: JSX.Element}) {
  return (
    <>
      <div>헤더</div>
      {props.children}
      <div className="h-20 pt-2 footer">
        <div className="max-w-6xl m-auto">© TFD.GG. All Rights Reserved. Hosted by Vercel. The First Descendant and all related logos are trademarks of Nexon.</div>
      </div>
    </>
  )

}