export default {
  async find(ctx) {
    const entity = await strapi.service('api::about.about').find(ctx.query);
    return entity;
  },
};
