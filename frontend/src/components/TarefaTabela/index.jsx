export default function TarefaTabela({ tarefas, onDeletar, onAtualizar }) {
  return (
    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
              ID
            </th>

            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
              Descrição
            </th>

            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id}>
              <td className="px-4 py-3">{tarefa.id}</td>

              <td className="px-4 py-3">{tarefa.task}</td>

              <td className="px-4 py-3 flex gap-3 items-center justify-start">
                <button
                  onClick={() => onAtualizar(tarefa.id, tarefa.task)}
                  className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Atualizar
                </button>
                <button
                  onClick={() => onDeletar(tarefa.id)}
                  className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
