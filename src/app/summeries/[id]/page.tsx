export default async function SummaryPage (props:{ params : Promise<{id: string}>}) {

    const params = await props.params;
    const id = params.id
   return <div>Summary page {id} </div>
}