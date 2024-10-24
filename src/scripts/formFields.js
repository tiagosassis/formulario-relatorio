// formFields.js
// Funções responsáveis por criar e configurar campos de formulário para inserção de dados.
import { createReportExtraEmployee } from "./displayFields.js"

export function addExtraEmployee() {
    /**
     * Adiciona um novo funcionário extra ao formulário, criando campos de entrada para nome, pagamento diário e chave Pix.
     * Esta função gera automaticamente IDs exclusivos para os campos de entrada com base na quantidade de funcionários extras já existentes.
     *
     * Estrutura HTML gerada:
     * <div class="flex-row-wrap extra-employee">
     *     <div class="flex-item-employee-name">
     *         <input type="text" name="extra-employee-name-{extraEmployeeId}" id="extra-employee-name-{extraEmployeeId}" class="float-input" required>
     *         <label for="extra-employee-name-{extraEmployeeId}" class="float-label">Nome</label>
     *     </div>
     *     <div class="flex-item-daily-payment">
     *         <input type="number" name="extra-employee-daily-payment-{extraEmployeeId}" id="extra-employee-daily-payment-{extraEmployeeId}" class="float-input" required>
     *         <label for="extra-employee-daily-payment-{extraEmployeeId}" class="float-label">Diária</label>
     *     </div>
     *     <div class="flex-item-pix-key">
     *         <input type="text" name="extra-employee-pix-key-{extraEmployeeId}" id="extra-employee-pix-key-{extraEmployeeId}" class="float-input" required>
     *         <label for="extra-employee-pix-key-{extraEmployeeId}" class="float-label">Chave Pix</label>
     *     </div>
     * </div>
     *
     * - Cada funcionário extra é representado por um <div> com a classe 'extra-employee'.
     * - Os campos de entrada têm atributos 'name' e 'id' gerados com o ID do funcionário extra.
     */
    const container = document.getElementById('section-extra-employee')
    const extraEmployeeCount = document.querySelectorAll('#section-extra-employee > div') // seleciona todos os campos ja criados para saber a quantidade de extras
    const extraEmployeeId = extraEmployeeCount.length + 1

    const div1 = document.createElement('div')
    div1.classList.add('flex-row-wrap', 'extra-employee')

    let div2, input, label

    
    div2 = document.createElement('div')
    div2.classList.add('flex-item-employee-name')
    input = document.createElement('input')
    input.setAttribute('id', `extra-employee-name-${extraEmployeeId}`)
    input.classList.add('float-input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', `extra-employee-name-${extraEmployeeId}`)
    input.setAttribute('required', '')
    label = document.createElement('label')
    label.setAttribute('for', `extra-employee-name-${extraEmployeeId}`)
    label.classList.add('float-label')
    label.textContent = 'Nome'
    div2.append(input, label)
    div1.appendChild(div2)

    div2 = document.createElement('div')
    div2.classList.add('flex-item-daily-payment')
    input = document.createElement('input')
    input.setAttribute('id', `extra-employee-daily-payment-${extraEmployeeId}`)
    input.classList.add('float-input')
    input.setAttribute('type', 'number')
    input.setAttribute('name', `extra-employee-daily-payment-${extraEmployeeId}`)
    input.setAttribute('required', '')
    label = document.createElement('label')
    label.setAttribute('for', `extra-employee-daily-payment-${extraEmployeeId}`)
    label.classList.add('float-label')
    label.textContent = 'Diária'
    div2.append(input, label)
    div1.appendChild(div2)

    div2 = document.createElement('div')
    div2.classList.add('flex-item-pix-key')
    input = document.createElement('input')
    input.setAttribute('id', `extra-employee-pix-key-${extraEmployeeId}`)
    input.classList.add('float-input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', `extra-employee-pix-key-${extraEmployeeId}`)
    input.setAttribute('required', '')
    label = document.createElement('label')
    label.setAttribute('for', `extra-employee-pix-key-${extraEmployeeId}`)
    label.classList.add('float-label')
    label.textContent = 'Chave Pix'
    div2.append(input, label)
    div1.appendChild(div2)

    container.appendChild(div1)

    createReportExtraEmployee(extraEmployeeId) // cria a div onde as informações do funcionario extra serão colocadas para mostrar no relatorio
}