const initGraph = (nodes) => {

    let graph = {}

    nodes.forEach(obj => {

        graph[obj["id"]] = []
    })

    return graph
}


const createGraph = (edges, graph) => {

    edges.forEach(edge => {
        
        const fromNode = edge.from
        const toNode = edge.to

        
        if (fromNode && toNode) {
            
            //undirected graph
            // console.log(fromNode, toNode)
            graph[fromNode].push(toNode)
            graph[toNode].push(fromNode)
            // console.log(graph[fromNode], graph[toNode])
        }
    })

    return ;

}

let getAdjacent = (node, sender, receiver, visited, graph, bridgeTables) => {

    let adjacent = [];

    if(node.startsWith('D'))
    {
        return adjacent
    }
    else if(node.startsWith('B'))
    {
        let connectedPorts = graph[node]

        let foundAdjacent = false;

        connectedPorts.forEach(portId => {

            if(bridgeTables[portId].includes(receiver) && !visited.includes(portId))
            {
                adjacent.push(portId)
                foundAdjacent = true;
                return adjacent;
            }

        })

        if(foundAdjacent)
        return adjacent

        let allPort = graph[node]

        adjacent = allPort.filter(port => !visited.includes(port));

        return adjacent
    }
    else if(node.startsWith('P'))
    {
        let allAdj = graph[node] 

        adjacent = allAdj.filter(adj => !visited.includes(adj));

        let flag = false

        adjacent.forEach(adj => {

            if(adj.startsWith('B'))
            flag = true
        })

        if(flag && !bridgeTables[node].includes(sender))
        {
            bridgeTables[node].push(sender)
        }

        return adjacent
    }
    else if(node.startsWith('L'))
    {
        let allAdj = graph[node] 

        adjacent = allAdj.filter(adj => !visited.includes(adj));

        return adjacent
    }
    else if(node.startsWith('H'))
    {
        let allAdj = graph[node] 

        adjacent = allAdj.filter(adj => !visited.includes(adj));

        return adjacent
    }

    return adjacent;

}



const nextForward = (nextNodes, sender, receiver, visited, graph, bridgeTables, forwardTable) => {

    // console.log()

    if(nextNodes.length === 0)
    return ;


    let allNext = []
    
    let forwarding = {}
    

    nextNodes.forEach(node => {

        visited.push(node)
        let adj = getAdjacent(node, sender, receiver, visited, graph, bridgeTables)
        forwarding[node] = adj

        allNext = allNext.concat(adj)
    })

    forwardTable.push(forwarding)

    nextForward(allNext, sender, receiver, visited, graph, bridgeTables, forwardTable)

    return ;
}



const send = (sender, receiver, graph, bridgeTables, forwardTable) => {

    let nextNodes = graph[sender]

    let forwarding = {}
    forwarding[sender] = nextNodes


    forwardTable.push(forwarding)


    let visited = []
    visited.push(sender)


    nextForward(nextNodes, sender, receiver, visited, graph, bridgeTables, forwardTable)

    return ;
}


const getFrontendTables = (nodes, graph, bridgeTables) => {

    const bridgeIds = nodes
        .filter(node => node.id.startsWith('B'))
        .map(bridgeNode => bridgeNode.id);


    const bridgePortMapping = {}

    bridgeIds.forEach(id => {

        bridgePortMapping[id] = graph[id]
    })

    Object.keys(bridgePortMapping).forEach(bridge => {
        bridgePortMapping[bridge] = bridgePortMapping[bridge].sort((a, b) => a.localeCompare(b));
    });
    
    // Create the final object with re-assigned port names
    const finalObject = {};
    
    Object.keys(bridgePortMapping).forEach(bridge => {

        finalObject[bridge] = {};
    
        bridgePortMapping[bridge].forEach((port, index) => {
            finalObject[bridge][`P${index + 1}`] = bridgeTables[port];

        });
    });
    
    return finalObject
}


const forwardTracing = (selectedEdges, nodes, bridgeTables, sender, receiver) => {

    
    // Initialize graph with empty lists for each node
    let graph = initGraph(nodes)
    
    // Populate graph with edges
    createGraph(selectedEdges, graph)


    forwardTable = []


    send(sender, receiver, graph, bridgeTables, forwardTable)


    let frontendTables = getFrontendTables(nodes, graph, bridgeTables)


    return {
        forwardTable,
        bridgeTables,
        frontendTables
    };
}



module.exports = forwardTracing