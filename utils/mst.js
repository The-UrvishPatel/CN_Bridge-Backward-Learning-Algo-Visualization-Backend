function kruskal(edges) {

    edges.sort((a, b) => a.weight - b.weight);

    const selectedEdges = [];
    const nonSelectedEdges = [];
    const parent = {};

    function findSet(v) {
        if (parent[v] === undefined) {
            return v;
        }
        return findSet(parent[v]);
    }

    function union(v1, v2) {
        const root1 = findSet(v1);
        const root2 = findSet(v2);
        parent[root1] = root2;
    }

    edges.forEach(edge => {
        const root1 = findSet(edge.from);
        const root2 = findSet(edge.to);

        if (root1 !== root2) {
            selectedEdges.push(edge);
            union(root1, root2);
        } else {
            nonSelectedEdges.push(edge);
        }
    });

    return { selectedEdges, nonSelectedEdges };
}

function initTable(nodes) {

    const table = {};

    nodes.forEach(node => {

        const nodeId = node.id;

        // Check if the node ID is a port (starts with 'P')
        if (nodeId.startsWith('P')) {
            // If the port is not already in the table, add it with an empty array
            if (!table[nodeId]) {
                table[nodeId] = [];
            }
        }
    });

    return table;
}


const mst = (data) => {

    console.log("data")

    let edges = data.edges
    let nodes = data.nodes

    edges.forEach(edge => {
        // edge.weight = parseInt(edge.label, 10);
        edge.weight = 1;
    });

    const result = kruskal(edges);

    result.selectedEdges.forEach(edge => delete edge.weight);
    result.nonSelectedEdges.forEach(edge => delete edge.weight);

    // let selectedEdges = result.selectedEdges;
    // let nonSelectedEdges = result.nonSelectedEdges;    

    bridgeTables = initTable(nodes)

    result["nodes"] = nodes
    result["bridgeTables"] = bridgeTables


    return result
}



module.exports = mst