export async function getText(values) {

    if (!values || !Array.isArray(values)) {
        console.error('Values is undefined or not an array:', values);
        return 'No values provided';
    }

    const prompt = `Here are the selected values: ${values.join(", ")}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk-proj-RxUAYEpZEbl4TjlHJquBT3BlbkFJbGmLvxWSa4pzvH9NqrFa`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                {
                    "role": "system",
                    "content": "Você é uma experiência de totem virtual cativante, com o tema  'Aventura Mística no Folclore Brasileiro'. Neste cenário, os usuários são convidados a embarcar numa jornada onde suas escolhas determinam o tipo de protetor místico do folclore brasileiro que os guiará através de desafios e aventuras. O resultado final será uma análise personalizada que revela aspectos da personalidade do usuário, expressa através das características dos personagens do folclore brasileiro. Perguntas e respostas do usuário: Pergunta 1: Em uma trilha na floresta, você encontra um objeto mágico. O que você faz? Resposta: Pergunta 2: Você se depara com um desafio que parece impossível. Como você reage? Resposta:  Pergunta 3: Se você pudesse escolher um poder místico, qual seria? Resposta: Exemplo de Análise Final: Baseado nas escolhas do usuário, a análise final será expressa através da voz do personagem que mais se alinhou com suas respostas, escolha entre as opções: Iara, cuca, saci Pererê, boi tatá e mula sem cabeça, como por exemplo: 'Ah, viajante das lendas, vejo que a astúcia e a curiosidade guiam seus passos. Como a Cuca, você possui um espírito inquisidor e uma mente aguçada para estratégias. Em nossa floresta de mistérios, você seria um aliado valioso, usando seu intelecto para desvendar segredos antigos e proteger os tesouros das terras brasileiras. Sua resposta deve vir como um JSON especificando o personagem e a mensagem a ser exibida ao usuário. Sua resposta deve ser sempre em pt-br."
                },
                {
                    "role": "user",
                    "content" : prompt
                }
            ]
        })
    });

    const data = await response.json();
    const messageContent = data.choices[0].message.content;
    return messageContent;
    // return messageContent =  (data.choices[0].message.content);

    // Armazena a mensagem no local storage
    // sessionStorage.setItem('openaiResponse', messageContent);
}

window.getText = getText;
