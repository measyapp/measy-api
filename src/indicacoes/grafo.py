import pandas as pd
from sys import stdout, argv

my_dict = { 'Capacidade de trabalho': 0, 'Velocidade': 0, 'Número de desenvolvedores por feature/stories': 0,
            'Gráfico de Burndown': 0,'Cobertura de teste unitário por história de usuário': 0, 'Acurácia nas estimativas': 0,
            'Porcentagem do trabalho adotado': 0, 'Fator foco': 0,'Acurácia da previsão futura': 0,
            'Porcentagem de trabalho descoberto': 0, 'Vazão (Throughput)': 0, 'WiP': 0,
            'Satisfação dos clientes': 0, 'Tempo em processo (Lead Time)': 0, 'Cycle Time (Cycle time)': 0}

#resposta das perguntas
respostas = argv[1]

df = pd.read_csv("src/indicacoes/dataset.csv")
colNames = df.columns

graph = dict()

colNames = df.columns
listVertex = []
for colName in colNames[:-2]:
    vertexQuestion = colName   
    graph[vertexQuestion] = [str(i) for i in df[df[colName] == 't']['Nome da Métrica'].values]

for vertexMetric in df['Nome da Métrica'].unique():    
    graph[str(vertexMetric)] = []

visited = set()

def dfs(visited, graph, node):
    if node not in visited:
        visited.add(node)
        
        for neighbour in graph[node]:
            my_dict[neighbour] = my_dict[neighbour] + 1
            dfs(visited, graph, neighbour)        

nQuestions = lambda graph: len(list(filter(lambda x: len(graph[x]) > 0, graph)))

metricas = ['Prazo de Entrega', 'Atividades Críticas','Entregas Incrementais','Esforço X Planejado',
            'Escopo do Projeto', 'Ciente satisfeito', 'Orçamento e Cronograma', 'Mudancas no Produto',
            'Processos Eficientes', 'Entrega para Cliente']

def checkQuestion(pergunta_):
    i = 0
    while(i < 10):
        if pergunta_ == metricas[i]:  
            if respostas[i] == '1':
                return True;
        i = i + 1

for root_forest in graph:
    if len(graph[root_forest]) > 0:
        if checkQuestion(root_forest):
            dfs(visited, graph, root_forest)

metricas_ordenadas = sorted(my_dict.items(), key=lambda x:x[1], reverse=True)
converted_dict = dict(metricas_ordenadas)

res = ''
i = 0

for sor in converted_dict:
    if i < 5:
        if i == 0:
            res = res +  '"' + sor + '"'
        else:
            res = res +  ',"' + sor + '"'
    i = i+1

res = res + ''

stdout.write(res)
stdout.flush()
