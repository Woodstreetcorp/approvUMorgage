export default {
  async find(params = {}) {
    return await strapi.entityService.findMany('api::about.about', {
      ...params,
      populate: {
        heroBackgroundImage: true,
        missionVisionCards: true,
        differentiators: true,
        stats: true,
        teamMembers: true,
        complianceBadges: true,
      },
    });
  },
};
