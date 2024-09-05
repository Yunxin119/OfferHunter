"""Add domain in model

Revision ID: d3b70d8cc873
Revises: f6929275c8ea
Create Date: 2024-09-05 13:37:48.867460

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3b70d8cc873'
down_revision = 'f6929275c8ea'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_domain', sa.String(length=80), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.drop_column('image_domain')

    # ### end Alembic commands ###