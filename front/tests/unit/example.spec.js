import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Card from "@/components/Card.vue";
import { BootstrapVue } from "bootstrap-vue";
const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("Card.vue", () => {
    it("Renderização de prop titulo", () => {
        const msg = "Titulo teste";
        const wrapper = mount(Card, {
            propsData: {
                text: msg,
                img: "https://img.itdg.com.br/images/recipes/000/029/124/320646/320646_original.jpg",
            },
            localVue,
        });
        expect(wrapper.find(".card-title").text()).toMatch(msg);
    });
});