const Store = () => {

    const collections = {};

    class Collection {

        constructor(ref){
            this.ref = ref;
            this.index = [];
            this.items = {}
        }

        add(item){
            if(item.id && !this.existId(item.id)){
                let storeIndex = this.index.length;
                this.index.push(item.id);
                this.items[item.id] = item;
                this.items[item.id].storeIndex = storeIndex;
            }
        }

        removeById(id){
            if(this.existId(id)){
                let storeIndex = this.items[id].storeIndex;
                this.index.splice(storeIndex, 1);
                delete this.items[id];
                this.indexedItems(storeIndex);
            }
        }

        getById(id){
            return this.items[id];
        }

        getByIndex(index){
            return this.items[this.index[index]];
        }

        existId(id){
            return !!this.items[id];
        }

        indexedItems(deleteIndex){

            let index = 0;

            if(Number.isInteger(deleteIndex)){
               index = deleteIndex;
            }

            for(let i = index; i < this.index.length; i++){
                this.items[this.index[i]].storeIndex = i;
            }
        }

        each(fn){
            for(let i = 0;i < this.index.length;i++){
                fn(this.getByIndex(i));
            }
        }

        map(fn){
            this.index.map(id => {
                return fn(this.getById(id));
            });
        }
    }

    const createCollection = (ref) => {
        collections[ref] = new Collection(ref);
    };

    const getAll = () => collections;

    const getCollectionByRef = (ref) => {
        return collections[ref];
    };

    return { createCollection, getCollectionByRef, getAll };
};

export default Store;