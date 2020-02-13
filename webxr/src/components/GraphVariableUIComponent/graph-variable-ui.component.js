import { MeshText2D, textAlign } from 'three-text2d'

AFRAME.registerComponent('graph-variable-ui', {
    schema: {
        graph: {
            type: "selector"
        }
    },
    init: function() {
        if (this.data.graph == null) {
            throw new Error("Graph Object not found!")
        }
        this.graph = this.data.graph.components["graph"];
        if (this.graph == null) {
            throw new Error("Graph Component not found!")
        }

        this.group = new THREE.Group();
                
        this.variables = this.graph.getVariables();

        const height = 0.30;
        const offset = Object.keys(this.variables).length * height / 2;

        let index = 0;
        for (let [variable, value] of Object.entries(this.variables)) {
            let slider = this.createSlider(variable, value);
            slider.setAttribute('position', `0 ${index * -height + offset} 0`)
            slider.addEventListener('change', (evt) => {
                var newvalue = evt.detail.value;
                let graphAtributes = {}
                graphAtributes[variable] = newvalue;
                this.data.graph.setAttribute('graph', graphAtributes)
            })
            this.el.appendChild(slider)
            index++;
        }

        this.el.setObject3D('mesh', this.group)
    },
    createSlider: function(variable, value, min = value - 1, max = value + 1) {
        const slider = document.createElement("a-entity");
        slider.setAttribute('my-slider', {
            title: `${variable}Value`,
            value,
            min,
            max
        })
        return slider;
    }
})